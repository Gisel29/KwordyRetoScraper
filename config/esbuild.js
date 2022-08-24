import esbuild from 'esbuild'

esbuild.build({ /*invoca el script build*/
entryPoints:['src/sw.js','src/scrapper/linkedin.js'],
watch: true,
bundle:true,
outdir:'dir',  
//target:'chrome',
minify: true
})
.then(response => console.log(JSON.stringify(response)))
.catch(err => console.log(err))
