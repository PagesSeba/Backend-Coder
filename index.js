class Usuario {
    constructor(nombre, apellido, mascotas, libros) {
        this.nombre = nombre
        this.apellido = apellido
        this.mascotas = mascotas
        this.libros = libros
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }

    getBookNames() {
        let nombres = []
        for (let i = 0; i < this.libros.length; i++) {
            nombres.push(this.libros[i].nombre)
        }
        return nombres
    }

}

let nombre = 'Sebastián'
let apellido = 'Pagés'
let mascotas = []
let libros = []
let usuario = new Usuario(nombre, apellido, mascotas, libros);

usuario.addMascota('Perra')
usuario.addMascota('Perra')
usuario.addMascota('Gata')
usuario.addBook('Game of Thrones', 'George RR Martin')
usuario.addBook('Roma soy yo', 'Santiago Posteguillo')


console.log(usuario.getFullName())
console.log(usuario.countMascotas())
console.log(usuario.getBookNames())