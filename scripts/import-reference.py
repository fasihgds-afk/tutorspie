"""Import the requested public design as local assets and editable React sections."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor
import re, json, os, subprocess

ROOT=Path(__file__).resolve().parent.parent
BASE='https://papershelm.com'
class Node:
    def __init__(self,tag='',attrs=()): self.tag,self.attrs,self.children=tag,dict(attrs),[]
VOID=set('area base br col embed hr img input link meta param source track wbr'.split())
class Parser(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.root=Node(); self.stack=[self.root]
    def handle_starttag(self,tag,attrs):
        n=Node(tag,attrs); self.stack[-1].children.append(n)
        if tag not in VOID:self.stack.append(n)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,data):self.stack[-1].children.append(data)

assets={}
def local(url,base=BASE):
    absolute=urljoin(base,url); p=urlparse(absolute)
    if p.netloc!='papershelm.com':return url
    dest='/reference'+p.path
    assets[absolute.split('?')[0]]=ROOT/'public'/dest.lstrip('/')
    return dest
def fetch(url,path):
    try:
        if not path.exists():
            path.parent.mkdir(parents=True,exist_ok=True)
            subprocess.run(['curl.exe','-f','-s','-L','--max-time','40',url,'-o',str(path)],check=True,capture_output=True)
        return None
    except Exception as e:return (url,str(e))

css_urls=['/Content/lib/bootstrap/bootstrap-5.3.3.min.css','/Content/t1/css/style.css','/Content/t1/css/responsive.css']
for url in css_urls:
    data=subprocess.check_output(['curl.exe','-f','-s','-L',BASE+url]).decode('utf-8-sig')
    data=re.sub(r'url\([\"\']?([^\)\"\']+)[\"\']?\)',lambda m:'url("'+local(m[1],BASE+url)+'")' if not m[1].startswith('data:') else m[0],data)
    # Discard unused missing custom fonts; retain the reference's primary font.
    data=re.sub(r'@font-face\s*\{[^}]*\}', '', data)
    target=ROOT/'public/reference'/url.lstrip('/');target.parent.mkdir(parents=True,exist_ok=True);target.write_text(data,encoding='utf8')

p=Parser();p.feed((Path(os.environ['TEMP'])/'papershelm-reference.html').read_text(encoding='utf8'))
def walk(n):
    if isinstance(n,Node):
        yield n
        for c in n.children:yield from walk(c)
body=next(n for n in walk(p.root) if n.tag=='body')
mapping={'class':'className','for':'htmlFor','tabindex':'tabIndex','colspan':'colSpan','rowspan':'rowSpan','maxlength':'maxLength','cellpadding':'cellPadding','cellspacing':'cellSpacing','readonly':'readOnly','autocomplete':'autoComplete'}
def render(n):
    if isinstance(n,str):
        s=re.sub(r'\s+',' ',n).replace('PapersHelm','Tutorspie').replace('papershelm.com','tutorspie.com').replace('+1 (866) 666-7342','Contact support')
        return '{'+json.dumps(s)+'}' if s.strip() else ''
    a=n.attrs;tag=n.tag
    if tag in ('script','noscript','iframe','style') or a.get('type')=='hidden' or 'modal' in a.get('class','').split() or a.get('id') in ('orderIDPrefix','customerIDPrefix','currentlink'):return ''
    if tag=='img' and '/SiteImages/papershelm/logo' in a.get('src',''):
        return '<span className="tutorspie-logo">Tutors<span>pie</span><small>ACADEMIC WRITING ASSISTANCE</small></span>'
    if '__cf_email__' in a.get('class',''):return '{"support@tutorspie.com"}'
    if tag=='h2' and 'heading' in a.get('class','').split():tag='h1'
    if tag=='form':a={k:v for k,v in a.items() if k not in ('action','method')}
    if tag=='select':
        opts=[x for x in walk(n) if x.tag=='option'];selected=next((x for x in opts if 'selected' in x.attrs),opts[0] if opts else None)
        if selected:a['defaultValue']=selected.attrs.get('value','')
        a['aria-label']={'ddl_type':'Assignment type','ddl_level':'Academic level','ddl_subject':'Subject','ddl_date':'Deadline'}.get(a.get('id'),'Choose an option')
    if tag=='li' and 'data-bs-slide-to' in a:
        a.update({'role':'button','tabindex':'0','aria-label':'Show slide '+str(int(a['data-bs-slide-to'])+1)})
    if a.get('id')=='navbar_closer':a.update({'role':'button','tabindex':'0','aria-label':'Close navigation'})
    if tag=='a':
        href=a.get('href','')
        if href.startswith('tel:'):a['href']='#support';a['data-action']='support'
        elif 'mailto:' in href or '/cdn-cgi/' in href:a['href']='#support';a['data-action']='support'
        elif 'register' in href.lower():a['href']='#order';a['data-action']='order'
        elif '/login' in href:a['href']='#login';a['data-action']='login'
        elif href=='#' and 'data-bs-toggle' not in a:a['href']='#support';a['data-action']='support'
        elif href.startswith('/') and href!='/':
            if '#' in href:a['href']='#'+href.split('#')[-1]
            elif 'writers' in href.lower():a['href']='#about'
            elif 'reviews' in href.lower():a['href']='#testimonials'
            else:a['data-action']='info';a['href']='#information'
        elif href.startswith('http'):a['href']='#information';a['data-action']='info'
    attrs=[]
    for k,v in a.items():
        if k.startswith('on') or k in ('selected','data-cfemail','data-bs-ride','data-bs-interval'):continue
        if k in ('src','data-src') and v:v=local(v)
        if k=='style':
            style={}
            for decl in (v or '').split(';'):
                if ':' not in decl:continue
                key,val=decl.split(':',1);key=re.sub(r'-([a-z])',lambda m:m[1].upper(),key.strip());val=val.strip().replace('!important','').strip()
                if val:style[key]=val
            attrs.append('style={'+json.dumps(style)+'}');continue
        if k=='value' and tag=='input':k='defaultValue'
        if k in ('required','disabled','checked','multiple','readOnly'):attrs.append(mapping.get(k,k)+'={true}');continue
        if v is None:continue
        if k=='tabindex':v=int(v)
        attrs.append(mapping.get(k,k)+'={'+json.dumps(v)+'}')
    opening='<'+tag+(' '+' '.join(attrs) if attrs else '')
    if tag in VOID:return opening+' />'
    return opening+'>'+''.join(render(c) for c in n.children)+'</'+tag+'>'

out=ROOT/'components/sections';out.mkdir(parents=True,exist_ok=True)
names=[]
for i,n in enumerate(body.children):
    if not isinstance(n,Node):continue
    if n.tag not in ('header','section','footer'):continue
    name='ReferenceSection'+str(i);names.append(name)
    (out/(name+'.tsx')).write_text('export default function '+name+'(){return ('+render(n)+');}\n',encoding='utf8')
(ROOT/'components/reference-content.tsx').write_text('\n'.join('import '+n+' from "./sections/'+n+'";' for n in names)+'\nexport default function ReferenceContent(){return <>'+''.join('<'+n+'/>' for n in names)+'</>;}\n',encoding='utf8')
errors=list(filter(None,ThreadPoolExecutor(max_workers=12).map(lambda pair:fetch(*pair),list(assets.items()))))
print(json.dumps({'sections':len(names),'assets':len(assets),'errors':errors}))
