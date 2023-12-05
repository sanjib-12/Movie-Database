class Apifeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        let queryString = JSON.stringify(this.queryStr);

        const regex = /\b(gte|gt|lte|lt)\b/;
        const containsOperations = regex.test(queryString);
        //the above tow line of code is used for detecting whether the query contains gte gt etc or not.
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        const queryObj = JSON.parse(queryString);
       // console.log(this.queryStr);
        

        if (containsOperations) {
            //the code inside this if deletes all the filed which are not need for filtering.
            const excludeFiels = ['sort', 'page', 'limit', 'fields'];
        
            const queryObjDelete = {...queryObj};
        
            excludeFiels.forEach(el =>{
                delete queryObjDelete[el];
            })
            //console.table(queryObjDelete)
            this.query =  this.query.find(queryObjDelete);
        } else {
            this.query =  this.query.find();
        } 


        
        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortby = this.queryStr.sort.split(',').join(" ");
            //console.log(sortby);
            this.query = this.query.sort(sortby);
        
        }else{
            this.query = this.query.sort('name');
        }

        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            const sortby = this.queryStr.fields.split(',').join(" ");
            console.log(sortby)
            this.query.select( sortby )
        }else{
            this.query = this.query.select('-__v');
        }
        return this
    }

    paginate(){
        const page = this.queryStr.page || 1;
        const limit = this.queryStr.limit || 10;
        const skip = (page-1)* limit;
        this.query = this.query.skip(skip).limit(limit);

    //     if(this.queryStr.page){
    //         const moviesCount = await Movie.countDocuments();
    //         if(skip >= moviesCount){
    //             throw new Error("This page in not found!");
    //         }
    //     }
        return this;
     }


} 

module.exports = Apifeatures;