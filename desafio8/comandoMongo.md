1)Mensajes agregados.
--------------------------------------
db.mensajes.insert(array de mensajes)

Tipo de Mensaje
{"autor": "edgardo@mi.cl", "texto": "cristalino"},

--------------------------------------
db.productos.insert(array de productos)

Tipo de Producto
{"autor":"edgardo marquez","libro":"cristalino","precio": 600, "foto":"https://picsum.photos/200"}


2)Realizado
3)comando que lista documentos de las colecciones
db.mensajes.count()
db.productos.count()
4)Mostrar la cantidad de documentos almacenados
db.mensajes.find().pretty()
db.productos.find().pretty() 
5)
a: db.productos.insert({"autor":"Vicente marquez","libro":"Angeles y demonios","precio": 3890, "foto":"https://picsum.photos/200"})
b.1: db.productos.find({precio: { $lt : 1000 } })
b.2: db.productos.find({precio: { $gte:1000 , $lte: 3000}})
b.3: db.productos.find({precio: { $gt: 3000}})
b.4: db.productos.find({}, {"libro":1, "_id": 0}).sort({precio:1}).skip(2).limit(1)
c: db.productos.update({},{$set:{"stock":100}},{upsert:false,multi:true})
d: db.productos.updateMany({precio: { $gte: 4000}}, {$set: {"stock":0}})
e: db.productos.deleteMany({precio: { $lt : 1000 } }) 
6) no realizado por indicacion del profesor
