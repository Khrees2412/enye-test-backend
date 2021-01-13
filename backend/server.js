const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.get("/api/rates", async (req, res) => {
	try {
		if (req.query.base && !req.query.currency) {
			const base = req.query.base;
			const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
			const data = response.data;
			res.status(200).json({
				results: data
			});
		} else if (req.query.base && req.query.currency) {
			const base = req.query.base;
			const currency = req.query.currency;
			const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`);
			const data = response.data;
			res.status(200).json({
				results: data
			});
		} else {
			const response = await axios.get("https://api.exchangeratesapi.io/latest");
			const data = response.data;
			res.status(200).json({
				results: data
			});
		}
	} catch (error) {
		res.statusCode(500).json("An error Occured, Please try again");
	}
});

const PORT = 5005;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
