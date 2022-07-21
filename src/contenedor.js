const fs = require("fs");

module.exports = class Contenedor {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
			return this.assign(true);
    } else {
      return JSON.parse(response);
    }
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		return data.find(element => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		data.push(product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return product;
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			previous: previousProduct[0],
			new: product,
		};
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct[0]
			}
		}
	}

  // Agrega id a los productos del archivo "productos.json" si sufre alguna modificacion
  assign(empty = false) {
		if(empty) {
			let id = 1;
			listaProductos.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(listaProductos));
			return listaProductos;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
		}
	}
}

const listaProductos = []