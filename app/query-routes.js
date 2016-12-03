//functions with the asterisks e.g function* means they are generator functions
//which allow you to use "yield" keywords
//yields are methods that will allow you data to be returned before it continues 
//execution of other code.
function* getIcons() {
    //in koa js to send response back, you do that by assinging the response to this.body
    this.body ={
        author: "Test",
        status: "active"
    }
}

export default {getIcons};