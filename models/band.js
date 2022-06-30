const {v4:uuidv4}=require('uuid');

class Band{
    constructor(name='no-name'){
        
        this.id=uuidv4();
        this.name=name;
        this.vote=0;

    }
}

module.exports=Band;