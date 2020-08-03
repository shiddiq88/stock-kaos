var db = firebase.database().ref('stock');

db.orderByChild('qty').on('value', snap => {
    let el = document.getElementById("content")
    el.innerHTML = '';
    let data = snap.val();
    snap.forEach(e => {
        let elChild = document.createElement('div')
        elChild.classList.add("col-4", "p-0")
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
    })
});