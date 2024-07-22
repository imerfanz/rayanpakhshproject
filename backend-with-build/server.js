const express = require("express");
const fs = require('fs').promises;
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const mainAdd = path.join(__dirname, "..");
const OrModel = require(__dirname + "/model1");
const OpModel = require(__dirname + "/model2");
const MaModel = require(__dirname + "/model3");
const multer = require("multer");
const { log } = require("console");
const { url } = require("inspector");
const { get } = require("http");

const allow = {origin : "https://raynpakhshtest.liara.run"}
app.use(cors());
app.use(express.static(path.join(__dirname, "adminPanel")));
app.use(express.static(path.join(__dirname, 'build')));


/* DB connection */
const dbUri = "mongodb://root:DHRmsF67U60sOK3KWDZyP64Q@rypakhsh:27017/my-app?authSource=admin&replicaSet=rs0&directConnection=true";


const connection = mongoose.connect(dbUri).then(() => {
  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
}).catch((err) => {
  console.log(err);
});



/*  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
  */

app.use(cors());
app.use(express.static(path.join(__dirname, "adminPanel")));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

/* form1 api */
app.post("/form1", express.json(), (req, res) => {
  const toWrite = req.body;
  const saver = new OrModel(toWrite);
  console.log("req sent! : " + JSON.stringify(toWrite));

  saver
    .save()
    .then(() => {
      res.status(200).send("received");
    })
    .catch((err) => {
      res.status(500).send("An error occurred: " + err.message);
      console.error(err);
    });
});
app.get("/form1", express.json(), async (req, res) => {
  const data = await OrModel.find({});
  res.end(JSON.stringify(data));
});

// form 1 delete 

app.delete("/form1delete/:id" , (req , res) => {
  OrModel.deleteOne({ _id : req.params.id }).then( () => {
    res.status(200).send(" حذف موفقیت آمیز !");
  }).catch( err => {
    res.status(500).send(" حذف موفقیت آمیز نبود : " , err );
  })
})

/* form2 api */
app.post("/form2", express.json(), (req, res) => {
  const toWrite = req.body;
  const saver = new OpModel(toWrite);
  console.log("req sent! : " + JSON.stringify(toWrite));

  saver
    .save()
    .then(() => {
      res.status(200).send("received");
    })
    .catch((err) => {
      res.status(500).send("An error occurred: " + err.message);
      console.error(err);
    });
});
app.get("/form2", express.json(), async (req, res) => {
  const data = await OpModel.find({});
  res.end(JSON.stringify(data));
});

// form 2 delete 

app.delete("/form2delete/:id" , (req , res) => {
  OpModel.deleteOne({ _id : req.params.id }).then( () => {
    res.status(200).send(" حذف موفقیت آمیز !");
  }).catch( err => {
    res.status(500).send(" حذف موفقیت آمیز نبود : " , err );
  })
})

/* tasavir api */
// configure

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "build/static/media"));
  },
  filename: function (req, file, cb) {
    cb( null , file.fieldname)
  },
});
const fileFilter1 = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload1 = multer({
  storage : storage1,
  fileFilter : fileFilter1
});
// image 1 
app.post("/mainPic1", upload1.single('image1'), async (req, res) => {
  await fs.rename('build/static/media/image1' , 'build/static/media/image1.b913895a64d19411986b');
  if (req.file) {
        res.status(200).send('عکس شماره یک با موفقیت آپلود شد!');
  } else {
    res.status(400).send('خطایی در آپلود عکس یک رخ داده!');
  }
});
// image 2
app.post("/mainPic2", upload1.single('image2') , async (req, res) => {
  await fs.rename('build/static/media/image2' , 'build/static/media/image2.1bead604ac26153be458');
  if(req.file){
    res.status(200).send('عکس شماره دو با موفقیت آپلود شد!')
  }else{
    res.status(400).send('خطایی در آپلود عکس دو رخ داده!')
  }
});
// demo 1
app.post("/demo1", upload1.single('demo1') , async (req, res) => {
  await fs.rename('build/static/media/demo1' , 'build/static/media/demo1.579e4f1c5f517f55b3ca');
  if(req.file){
    res.status(200).send('دمو یک با موفقیت آپلود شد!')
  }else{
    res.status(400).send('خطایی در آپلود دمو یک رخ داده!')
  }
});
// demo 2
app.post("/demo2", upload1.single('demo2') , async (req, res) => {
  await fs.rename('build/static/media/demo2' , 'build/static/media/demo2.579e4f1c5f517f55b3ca');
  if(req.file){
    res.status(200).send('دمو دو با موفقیت آپلود شد!')
  }else{
    res.status(400).send('خطایی در آپلود دمو دو رخ داده!')
  }
});
/* news and adds pic api */
// configure
const storage2 = multer.diskStorage({
  destination : function (req , file , cb){
    cb( null , path.join(__dirname, "build/static/media"))
  },
  filename : function ( req , file , cb){
    cb( null , file.fieldname)
  }
});
const upload2 = multer({storage : storage2});

// khabar 1 


app.post('/khabar1' , upload2.single('khabar1') , async (req , res) => {
  await fs.rename('build/static/media/khabar1' , 'build/static/media/khabar1.b1fda55f9b78305c1d85');
  const toWrite = {
    id : 1,
    text : req.body.txt ,
    url : req.body.url
  }
  const saver = new MaModel(toWrite);
  MaModel.find({ id : 1}).exec().then( async () => {
    await MaModel.deleteOne({ id : 1 }).exec();
  }).then(async () => {
  await saver.save().then(() => {
    res.send("خبر یک با موفقیت تنظیم شد!")
  })}).catch( err => {
    res.send("خطایی رخ داده!")
  })
})

// khabar 2

app.post('/khabar2' , upload2.single('khabar2') , async (req , res) => {
  await fs.rename('build/static/media/khabar2' , 'build/static/media/khabar2.facb7023e0ba94749023');
  const toWrite = {
    id : 2,
    text : req.body.txt ,
    url : req.body.url
  }
  const saver = new MaModel(toWrite);
  MaModel.find({ id : 2}).exec().then( async () => {
    await MaModel.deleteOne({ id : 2 }).exec();
  }).then(async () => {
  await saver.save().then(() => {
    res.send("خبر دو با موفقیت تنظیم شد!")
  })}).catch( err => {
    console.log(err);
    res.send("خطایی رخ داده!")
  })
})

// tablighMain

app.post('/tablighMain' , upload2.single('tablighMain') , async (req , res) => {
  await fs.rename('build/static/media/tablighMain' , 'build/static/media/tablighMain.d578f0386845a0369e15');
  const toWrite = {
    id : 3,
    text : req.body.txt,
    url : req.body.url
  }
  const saver = new MaModel(toWrite);
  MaModel.find({ id : 3 }).exec().then( async () => {
    await MaModel.deleteOne({ id : 3}).exec();
  }).then( async () => {
    await saver.save().then(() => {
      res.send('تبلیغ اصلی با موفقیت تنظیم شد!')
    })
  }).catch( err => {
    res.send("خطایی رخ داده!")
  })
})

// tabligh 2 

app.post('/tabligh2' , upload2.single('tabligh2') , async (req , res) => {
  await fs.rename('build/static/media/tabligh2' , 'build/static/media/tabligh2.84885646891dba436190');
  const toWrite = {
    id : 4,
    text : req.body.txt,
    url : req.body.url
  }
  const saver = new MaModel(toWrite);
  MaModel.find({ id : 4 }).exec().then( async () => {
    await MaModel.deleteOne({ id : 4}).exec();
  }).then( async () => {
    await saver.save().then(() => {
      res.send('تبلیغ دو با موفقیت تنظیم شد!')
    })
  }).catch( err => {
    res.send("خطایی رخ داده!")
  })
})

// top text

app.post('/topText' , express.json() , (req , res ) => {
  const saver = new MaModel( {
    id : 5,
    text : req.body.text,
    url : ""
  });

  MaModel.find({ id : 5}).exec().then( async () => {
    await MaModel.deleteOne({ id : 5}).exec();
  }).then( async () => {
    await saver.save().then( () => {
      res.send(' متن بالا با موفقیت تنظیم شد !')
    })
  }).catch( () => {
    res.send('خطایی رخ داده !')
  })
})

/* admin entery */

const randomNumber = (Math.floor(Math.random() * 90000) + 10000).toString();
app.post("/adminentry", express.json(), (req, res) => {
  if ((req.body.user == "rayan", req.body.pass == "pakhsh")) {
    res.end("https://raynpakhshtest.liara.run/adminentryadfdsfdserfdxdsd");
  }
});

app.get("/adminentryadfdsfdserfdxdsd", (req, res) => {
  res.sendFile("panel.html", { root: __dirname + "/adminPanel" });
});

/* get all texts */

app.get('/allDbTexts' , (req , res) => {
  MaModel.find({}).sort({id: 1}).exec().then( (data) => {
    console.log(data);
    res.send(data);
  });
})

// 404 page 
app.use((req , res ) => {
  res.sendFile(path.join(__dirname+'/build/404.html'));
})
