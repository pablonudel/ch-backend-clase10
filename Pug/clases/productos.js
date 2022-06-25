class Productos{
    constructor (array){
        this.array = array
    }

    getAll(){
        return this.array
    }

    getById(id){
        return this.array.find(p => p.id === id)  
    }

    add(obj){
        const newId = this.array.length === 0 ? 1 : this.array[this.array.length - 1].id + 1
        obj.id = newId
        this.array.push(obj)
        return obj
    }

    updateById(id, obj){
        let objIndex = this.array.indexOf(this.array.find(p => p.id === id))
        this.array[objIndex] = obj
        return this.array[objIndex]
    }

    deleteById(id){
        return this.array = this.array.filter(p => p.id != id)
    }
}

module.exports = Productos