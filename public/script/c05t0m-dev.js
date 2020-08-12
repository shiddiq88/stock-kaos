var db = firebase.database().ref('stock');
tulisData('qty')
let elPilihan = document.getElementById('pilihan-size')
let el = document.getElementById("content")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function reWrite() {
    el.innerHTML = '<img id="loading" src="ajax-loader.gif" class="mx-auto d-block">';
    await sleep(500)
    tulisData(elPilihan.value)
}

elPilihan.addEventListener('change', reWrite)

function tulisData(size) {

    db.orderByChild(size).on('value', snap => {
        el.innerHTML = '';
        let data = snap.val();
        snap.forEach(e => {
            if (data[e.key][size] > 0) {
                let elChild = document.createElement('div')
                elChild.classList.add("col-4")
                elChild.innerHTML =
                    `<div class="card text-center m-0">
                <div class="card-header">
                            ${e.key}
                </div>
                <img src="img/${e.key}.webp" class="card-img-top" alt="noimage" onerror="this.src='img/noimage.webp';">
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
                                <td>${data[e.key].S}</td>
                                <td>${data[e.key].M}</td>
                                <td>${data[e.key].L}</td>
                                <td>${data[e.key].XL}</td>
                                <td>${data[e.key].XXL}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`
                el.insertBefore(elChild, el.firstChild)
            }
        })
    });
}