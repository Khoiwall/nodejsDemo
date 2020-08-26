var db = require('../db')

module.exports.indexProduct = function(req,res){
    var q = parseInt(req.query.q);
    var numberPage = []
    var tmp;

    if (!q){
        q = 1
    }

    var begin = (q - 1)*8
    var end = q*8
    
    if ( q === 1 ){
        numberPage.push(1)
        numberPage.push(2)
        numberPage.push(3)
    }
    else if ( q === 2 ){
        numberPage.push(1)
        numberPage.push(2)
        numberPage.push(3)
    }
    else if ( q === 3 ){
        numberPage.push(2)
        numberPage.push(3)
        numberPage.push(4)
    }
    else{
        for (var i = q - 1; i < q + 2; i++){
            if (end <= 100){
                numberPage.push(i)
            }
            else{
                tmp = 0
            }
        }
    }

    if (tmp === 0){
        numberPage.push(q-2)
        numberPage.push(q-1)
        numberPage.push(q)
    }
    
    res.render('product/product',{
        products: db.get('product').slice(begin,end).value(),
        Page: numberPage
    })
}