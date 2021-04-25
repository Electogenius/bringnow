function search(a) {
  document.querySelector('#messages').innerHTML = '';
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent('https://bringnow-eg-server.vercel.app/api?search=' + a)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
      data.forEach(v => {
        var a = document.createElement('div');
        var d = document.createElement('div');
        d.innerText = v.site;
        a.appendChild(d);
        var b = document.createElement('div');
        b.innerText = v.title;
        var c = document.createElement('a');
        c.href = v.link;
        var e = document.createElement('div');
        e.innerText = v.desc;
        a.appendChild(b);
        a.appendChild(e);
        c.appendChild(a);
        c.className = 'msg';
        document.querySelector('#messages').appendChild(c);
      })
    });
}