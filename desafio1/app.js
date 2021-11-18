
class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        return(` ${this.nombre} ${this.apellido}`);
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    addBook(autor, libro){
        this.libros.push({autor, libro});
        return this.libros.length;
    }
    countMascotas(){
        return this.mascotas.length;        
    }
    getBookNames(){
        let arrayLib = this.libros.map(function(lib) {
            return lib.libro;
         });
         return arrayLib;
    }
}
const usuario = new Usuario("edgardo", "Palacios", [{autor: "Stephen Kign", libro: "Misery"}, {autor: "Isabel Allende", libro: "Paula"}], ["laica", "tom", "princesa"]);

console.log(usuario)
console.log(usuario.getFullName());

usuario.addMascota("cleo");
console.log(usuario);

usuario.addBook("Gabriel Garcia", "100 Años de Soledad");
console.log(usuario);

console.log(usuario.countMascotas());

console.log(usuario.getBookNames());

