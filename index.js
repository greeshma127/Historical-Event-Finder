import express from "express";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})

app.get("/",(req,res)=>{
    res.render("index.ejs", { content: null, content2: null, content3: null, error: null,});
})

app.post("/get-events",async(req,res)=>{
    const searchDate=req.body.date;
    const searchMonth=req.body.month;
    try{
        const result=await axios.get(`https://byabbe.se/on-this-day/${searchMonth}/${searchDate}/events.json`);
        const events=result.data.events;
        const randomEvent=events[Math.floor(Math.random()*events.length)];
        res.render("index.ejs", { content: randomEvent, content2: null, content3: null, error: null, });
    }
    catch(error){
        res.render("index.ejs", { content: null, content2: null, content3: null, error: error.response ? error.response.data : "An error occurred" });
    }
})

app.post("/get-deaths",async(req,res)=>{
    const searchDate=req.body.date;
    const searchMonth=req.body.month;
    try{
        const result=await axios.get("https://byabbe.se/on-this-day/"+searchMonth+"/"+searchDate+"/deaths.json");
        const deaths=result.data.deaths;
        const randomDeath=deaths[Math.floor(Math.random()*deaths.length)];
        res.render("index.ejs", { content: null, content2: randomDeath,  content3: null, error: null });
    } catch (error) {
        res.render("index.ejs", { content: null, content2: null, content3: null, error: error.response ? error.response.data : "An error occurred" });
    }
})

app.post("/get-births",async(req,res)=>{
    const searchDate=req.body.date;
    const searchMonth=req.body.month;
    try{
        const result=await axios.get("https://byabbe.se/on-this-day/"+searchMonth+"/"+searchDate+"/births.json");
        const births=result.data.births;
        const randomBirth=births[Math.floor(Math.random()*births.length)];
        res.render("index.ejs", { content: null, content2: null,  content3: randomBirth, error: null });
    } catch (error) {
        res.render("index.ejs", { content: null, content2: null,  content3: null, error: error.response ? error.response.data : "An error occurred" });
    }
})
