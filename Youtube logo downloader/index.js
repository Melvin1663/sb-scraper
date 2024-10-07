const get = require('node-fetch2');
const data = require('./data.json');
const { resolve } = require('path');
const save = require('./save.js');
// (async() => { 
//   for await (const c of data.channels) {
//     const fn = async () => {
//       let res = await get(`https://youtube.com/channel/${c}`);
//       // let res = await get (`https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault,items%2Fsnippet%2Ftitle&id=UCsfsTztDWoqfxZuWRMJr4ow&key=AIzaSyC-ie7G9H7mDCPwL-M6clyHjljFd6yBdl8`)
//       if (!res || res.status >= 400) return;
//       console.log(c, res.status);
//       res = await res.text();
//       fs.writeFileSync('result.txt', res);
//       let name = res.match(/"channelMetadataRenderer":{"title":"(.*?)(?=")"/gm);
//       if (!name) return await fn();
//       name = name[0].replace(`"channelMetadataRenderer":{"title":"`, '').replace(/"/g, '');
//       let url = res.match(/:88},{"url":"https:\/\/(.*?)(?=")"/gm);
//       if (!url) return await fn();
//       if (url.length >= 2) url = url[url.length - 2].match(/"(.*?)(?=")"/gm);
//       else url = url[url.length - 1].match(/"(.*?)(?=")"/gm);
//       url = url[url.length - 1].replace(/"/g, '');
//       console.log(url);
//       url = url.replace(url.match(/=s\d+/gm)[0], '=');
//       // console.log(url, c, name)
//       console.log(c, name);
//       save(url, resolve(__dirname, `./result/${name}.jpg`))
//     }

//     await fn();
//   }
// })();

get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault,items%2Fsnippet%2Ftitle&id=${data.channels.join(',')}&key=AIzaSyC-ie7G9H7mDCPwL-M6clyHjljFd6yBdl8`).then(async res => {
  if (!res || res.status >= 400) return console.log('error', res.status);
  res = await res.json();
  res.items.forEach(c => {
    let name = c.snippet.title;
    let url = c.snippet.thumbnails.default.url;
    url = url.replace(url.match(/=s\d+/gm)[0], '=');
    console.log(url);
    save(url, resolve(__dirname, `./result/${name.slice(0, 150)}.jpg`));
    console.log(name);
  })
})


// data.channels.forEach(async c => {
//   const fn = async () => {
//     let res = await get(`https://youtube.com/channel/${c}`);
//     if (!res || res.status >= 400) return;
//     // console.log(c, res.status);
//     res = await res.text();
//     // console.log(res);
//     let name = res.match(/"channelMetadataRenderer":{"title":"(.*?)(?=")"/gm);
//     if (!name) return await fn();
//     name = name[0].replace(`"channelMetadataRenderer":{"title":"`, '').replace(/"/g, '');
//     let url = res.match(/:88},{"url":"https:\/\/(.*?)(?=")"/gm);
//     if (!url) return await fn();
//     // console.log(name, url)
//     if (url.length >= 2) url = url[url.length - 2].match(/"(.*?)(?=")"/gm);
//     else url = url[url.length - 1].match(/"(.*?)(?=")"/gm);
//     url = url[url.length - 1].replace(/"/g, '');
//     url = url.replace(url.match(/=s\d+/gm)[0], '=');
//     // console.log(url, c, name)
//     console.log(c);
//     save(url, resolve(__dirname, `./result/${name}.jpg`))
//   }

//   await fn();
// })