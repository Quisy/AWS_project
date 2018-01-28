let message = null;

class Statics{
    
    static get Message() {
        var messageToReturn = message;
        message = null;
        return messageToReturn;
    }
    static set Message(value){
        message = value;
    }
}

export default Statics;