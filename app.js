const express=require('express');
const app=express();
const path =require('path');
const homeRouter=require('./routes/home.route')
const productRouter=require('./routes/product.route')
const authRouter=require('./routes/auth.router')
const session=require('express-session');
const flash=require('connect-flash');
const cartRouter=require('./routes/cart.router')
const vendorRouter=require('./routes/vendor.route')
const contactRouter=require('./routes/contact.router')
const orderRouter=require('./routes/order.router')
const profileRouter=require('./routes/profile.router')
const adminsiteRouter=require('./routes/adminsite.router');
const { Cookie } = require('express-session');
const SessionStore=require('connect-mongodb-session')(session);//دالة تاخض السيشن التي قمنا بتحميلها وترجع كونستراكتور
app.use(express.static(path.join(__dirname,'assets')));//استدعاء الملف الثابت الدي نحن من يكتف فيه الاكوادzد
app.use(express.static(path.join(__dirname,'images')));//استدعاء الملف الثابت الدي نضع فيه التنزيلات مثل الصور التي يقوم بتحميلها المستخدم
app.use(flash());
const STORE=new SessionStore({
    uri:'mongodb://localhost:27017/online-shop',//اللينك الخاص بقاعدة البيانات التي اعمل عليها
    collection:'sessions'//اسم الكولاكشن التي احفض فيها السكشنز
});

app.use(session({
    secret:'lsjdf isjfie .fs ifiehifhwofsdf,,...sdjfiosdfoe ofowje',
    saveUninitialized:false,   
    store:STORE
}))
app.set('view engine','ejs');
app.set('views','views');
app.use('/adminsite',adminsiteRouter);
app.use('/',profileRouter)
app.use('/',homeRouter);//الصفحة الرئيسية
app.use('/',authRouter);//تسجيل الدخول
app.use('/user',authRouter)
app.use('/product',productRouter)//صفحة المنتجات هدا الميدلوير يجب ان يكون اخر ميدلوير لانه يحتوي على راوتر براميتر
app.use('/cart',cartRouter)
app.use('/orders',orderRouter)
app.use('/vendor',vendorRouter)
app.use('/contact-us',contactRouter)
app.get('/test',(req,res,next)=>{
    res.render("test")
})
app.get('/errors',(req,res,next)=>{
    res.status(500)
    res.render('errors',{
        isUser:req.session.isUser,
        isVendor:req.session.isVendor
    })
})
app.get('/not-vendor',(req,res,next)=>{
    res.status(403)
    res.render('not-vendor',{
        isUser:req.isUser,
        isVendor:false,
        pageTitle:'Not-vendor'
    })
})
app.get('/not-adminsite',(req,res,next)=>{
    res.status(403)
    res.render('not-adminsite',{
        isUser:req.isUser,
        isVendor:false,
        pageTitle:'Not-Adminsite'
    })
})

app.listen(3000,()=>{
    console.log('server listen on port 3000...')
});