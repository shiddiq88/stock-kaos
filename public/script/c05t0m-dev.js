let elPilihan = document.getElementById('pilihan-size')
let el = document.getElementById("content")
let db = firebase.database().ref('stock')
let strg = firebase.storage()

tulisData('qty')
elPilihan.addEventListener('change', reWrite)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function reWrite() {
    el.innerHTML = '<img id="loading" src="./img/ajax-loader.gif" class="mx-auto d-block">';
    await sleep(500)
    tulisData(elPilihan.value)
}

function tulisData(size) {
    db.orderByChild(size).on('value', snap => {
        el.innerHTML = '';
        let data = snap.val();
        let ar = []
        snap.forEach(eArray => {
            ar.push(eArray.key)
        })
        ar.reverse()
        ar.forEach(e => {
            if (data[e][size] > 0) {
                let elChild = document.createElement('div')
                elChild.classList.add("col-4", "col-md-2", "col-sm-3", "p-0")
                elChild.innerHTML =
                    `<div class="card text-center m-0">
                        <div class="card-header">${e}</div>
                        <img id="${e}" src="./img/img-loading.gif" height="120" class="card-img-top" alt="noimage" onerror="this.src='img/noimage.webp';">
                        <div class="card-footer">
                            <table class="table table-sm ">
                                <thead>
                                    <tr>
                                        <th>S</th>
                                        <th>M</th>
                                        <th>L</th>
                                        <th>XL</th>
                                        <th>XXL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${data[e].S}</td>
                                        <td>${data[e].M}</td>
                                        <td>${data[e].L}</td>
                                        <td>${data[e].XL}</td>
                                        <td>${data[e].XXL}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`
                el.append(elChild)
                strg.ref('kaos').child(e+'.webp').getDownloadURL().then(function(url) {
                    document.getElementById(e).src = url
                }).catch(function(error) {
                    document.getElementById(e).src = './img/noimage.webp'
                })
            }
        })
    });
}