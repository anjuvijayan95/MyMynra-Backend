//import db.js
const db=require('./db')

const jwt=require('jsonwebtoken')

//create arrow function the argument should be same as the argument posting from f:end
const register = (uname,mobile,pswd,address)=>{
    console.log('inside register arrow fun from dataService');
    return db.Customer.findOne({
        mobileNum:mobile
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:403,
                message:'this account already exist'
            }
        }
        else{
            const newUser=new db.Customer({
                username:uname,
                mobileNum:mobile,
                password:pswd,
                address
            })
            newUser.save()
            return{
                statusCode:200,
                message:'Registration successfull'
            }
        }
    })
}


const login=(mobile,pswd)=>{
    return db.Customer.findOne({
        mobileNum:mobile,
        password:pswd
    }).then((result)=>{
        if(result){
            const token=jwt.sign({
                CuttentMobile:mobile
            },'gulu')
            return{
                statusCode:200,
                message:'login successfull'
            }
        }
        else{
            return{
                statusCode:404,
                message:'Invalid Account/Password'
            }
        }
    })
}


const allProducts=()=>{
    return db.Product.find().then((result)=>{
         // console.log(result);
         if(result){
             return{
                 statusCode:200,
                 products:result
             }
         }
         else{
             return{
                 statusCode:404,
                 message:'Your database is empty'
             }
         }
     })
 }


 const viewProduct=(id)=>{
    return db.Product.findOne({
         id
     }).then((result)=>{
         if(result){
             return{
                 statusCode:200,
                 product:result
             }            
         }else{
             return{
                 statusCode:404,
             message:'Products is unavailable'
             }
             
         }
     })
 }


// const brandProducts=()=>{
//     return db.Product.find({
//         brand:'Roadster'
//     }).then((result)=>{
//         if(result){
//             return{
//                 statusCode:200,
//                 brands:result
//             }
//         }else{
//             return{
//                 statusCode:404,
//                 message:'There is no such brand products'
//             }
//         }
//     })
// }

const brands=()=>{
    return db.Brand.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                brands:result
            }
        }else{
            return{
                statusCode:404,
                message:'There is no such brand'
            }
        }
    })
}


const addtowishlist=(product)=>{
    return db.Wishlist.findOne({
        id:product.id
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:'this products is already exist'
            }
        }else{
            let newProduct=new db.Wishlist({
                id: product.id,
                brand:product.brand,
                title:product.title,
                price: product.price,
                image: product.image,
                pricetag:product.pricetag,
                category:product.category
            })
            newProduct.save()
            return{
                statusCode:200,
                message:'Added to wishlist'
            }
        }
       
    })
}


const getwishlist = ()=>{
    return db.Wishlist.find().then(
        (result) => {
            if (result) {
                return {
                    statusCode: 200,
                    wishlist: result
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: "Wishlist is empty"
                }
            }
        }
    )
}

const deletewishlist=(id)=>{
    return db.Wishlist.deleteOne({
        id
    }).then((result)=>{
        if(result){
            return db.Wishlist.find().then((result)=>{
                if(result){
                    return{
                        statusCode:200,
                        wishlist:result
                    }
                }else{
                    return{
                        statusCode:404,
                        message:'Your Wishlist is Empty'
                    }
                }
            })
            }else{
                return{
                    statusCode:404,
                    message:'Item not Found'
                }
            }
        }
    )
}


module.exports={
    register,
    login,
    allProducts,
    // brandProducts,
    viewProduct,
    brands,
    addtowishlist,
    getwishlist,
    deletewishlist
}