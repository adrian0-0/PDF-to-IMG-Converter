<h1>Conversor PDF para IMG com suporte a fontes personalizadas</h1>

<h2>Bibliotecas usadas:</h2>
<a href="https://github.com/jsdom/jsdom#readme">jsdom</a>
<a href="https://github.com/kb47/pdf-poppler#readme">pdf-poppler</a>

<h3>Modo de uso:</h3>
<code>node convert.js cabana_vip ./sample.pdf</code>
<ul>
    <li>node argument: ./filename</li>
    <li>node argument: pdf-config(cabana_vip, cabana_imperatriz, emporio)</li>
</ul>
<h3>Conversão de mutiplos PDFs</h3>
<code>node convert.js cabana_vip ./sample.pdf cabana_imperatriz ./sample.pdf</code>

<h3>Adição de novas configurações PDF-JSON</h3>
<p>Caso adicione uma nova configuração introduza no diretório ./pdf_config</p>
<p>O node argument que irá para executar a nova config, será de acordo com o nome do arquivo JSON</p>
