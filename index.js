
//CORE MODULES
let fs=require('fs')
let http=require('http')
const url = require('url');

const slugify=require('slugify');


//PRIVATE MODULES
const replaceTemplate=require('./modules/replaceTemplate');


// fs.readFile('./txt/start.txt', 'utf8',(err, data)=>{
    
//     fs.readFile(`./txt/${data}.txt`, 'utf8',(err, data2)=>{
            
//     fs.readFile(`./txt/append.txt`, 'utf8',(err, data3)=>{
//         let myOutput=`${data2}\n${data3}`
//         fs.writeFile('message.txt',myOutput, 'utf8',(err) => {
    
//             console.log('㊗ ')
//           });
//     })
   
//     })
 
// })

let overvw=fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf8')

// let prodt=fs.readFileSync(`${__dirname}/templates/product.html`, 'utf8')
let api=fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8')
const apiData=JSON.parse(api)


let tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8')
let tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8')
let tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8')



    // console.log(el.nutrients.includes(`${input}`) )



const server = http.createServer((req, res) => {
    // let pathName=req.url;
    let {query, pathname}=url.parse(req.url, true)

    //    const [query, pathname]=url.parse(pathname, true)
   

    //OVERVIEW PAGE
    if(pathname==='/'||pathname==='/overview'){
       const cardsHTML= apiData.map(el=>replaceTemplate(tempCard,el)).join(" ");
       const output=tempOverview.replace(/{%PRODUCT_CARD%}/g, cardsHTML)
    //    console.log(url.parse(pathname).query)
 
    
    //    console.log(tempover)
    
        res.writeHead(200, {
            'Content-Type': 'text/html' });
        res.end(output)
        
    //PRODUCT PAGE
    }else if(pathname==='/product'){
        let product=apiData[query.id]
        const output=replaceTemplate(tempProduct,product)
        res.writeHead(200, {
            'Content-Type': 'text/html' });
        res.end(output);   

        
    //API PAGE
    }else if(pathname===`/api`){
        res.end(api);   
        
    //SELECTION PAGE 
    }else{
        pathname===`/${req.url}`
        // console.log(pathname)
     
        res.writeHead(200, {
            'Content-Type': 'application/json' });

            let input=pathname.split('/')[1].toLowerCase();
            // console.log(input)
          
            let result=apiData.filter((el)=>{
                let data=el.nutrients.toLowerCase().includes(`${input}`)
               return data                        
            })

  
            
        res.end(JSON.stringify(result));  
    }
   
  });
  server.listen(8000,'127.0.0.1',()=>{
   console.log('Listening to request on port 8000')
  });



