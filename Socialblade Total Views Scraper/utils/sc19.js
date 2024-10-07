const src = require('script-tags')

module.exports = (data, args) => {
  let res = {
    name: args[0],
    data: {}
  }

  let createdAt = data.match(/(?<=User Created<\/span><br\/><span style="font-weight: bold;">).+?(?=<\/span><\/div>)/gm);
  if (!createdAt?.length) {
    createdAt = data.match(/(?<=User Created<\/span><br \/><span style = "font-weight: bold;">).+?(?=<\/span><\/div>)/gm);
    if (!createdAt?.length) console.log('No Created At Matches found')
    else createdAt = createdAt[0];
  } else createdAt = createdAt[0];

  createdAt = new Date(createdAt.replace('th', '').replace('nd', '').replace('st', '')).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })

  res.data[createdAt] = 0

  let views;
  try {
    views = JSON.parse(`{"data":${src(data)
      .filter(a => a.attrs.type == 'text/javascript' && a.html.length > 1000)[0].html
      .split('\n')
      .filter(b => b.includes('series: ['))[3]
      .match(/(?<=data: ).+?(?= }])/gm)[0]
      }}`).data
  } catch (e) {
    console.error(e);
  }

  let views_weekly;
  try {
    views_weekly = JSON.parse(`{"data":${src(data)
      .filter(a => a.attrs.type == 'text/javascript' && a.html.length > 1000)[0].html
      .split('\n')
      .filter(b => b.includes('series: ['))[5]
      .match(/(?<=data: ).+?(?= }])/gm)[0]
      }}`).data
  } catch (e) {
    console.error(e);
  }

  if (views_weekly) views_weekly.reverse().forEach(s => {
    let date = `${new Date(s[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}`
    res.data[date] = s[1];
  })

  if (views) views.reverse().forEach(s => {
    let date = `${new Date(s[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}`
    res.data[date] = s[1];
  })

  return res;
}