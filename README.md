<h1>PDF to IMG Converter with custom font support</h1>

<h2>Librarys used:</h2>
<a href="https://github.com/jsdom/jsdom#readme">jsdom</a>
<a href="https://github.com/kb47/pdf-poppler#readme">pdf-poppler</a>

<h3>How to use:</h3>
<code>node convert.js sample ./sample.pdf</code>
<ul>
    <li>node argument: config(sample, cabana_vip, cabana_imperatriz, emporio)</li>
    <li>node argument: ./filename</li>
</ul>
<h3>Converting mutiple PDF files</h3>
<code>node convert.js cabana_vip ./sample.pdf cabana_imperatriz ./sample.pdf</code>

<h3>Adition of new configurations of PDF-JSON</h3>
<p>When you put a new configuration please input on the ./config directory as a json file</p>
<p>The node argument which will run the new config, it will be accorded with the JSON file name</p>
