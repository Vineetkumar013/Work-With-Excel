const Exceldata = require("../model/model");
const xlsx = require('xlsx');

const createExcel = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let i = 0; i < jsonData.length; i++) {
      const { mobile, ...data } = jsonData[i];
      const existingRecord = await Exceldata.findOne({ mobile });

      if (existingRecord) {
        await Exceldata.updateOne({ mobile }, { $set: { rebuttal: data.rebuttal } });
      } else {
        await Exceldata.create({ mobile, ...data });
      }
    }

    res.status(200).json({
      Total: jsonData.length,
      msg: "Fetched the excel data successfully",
      data: jsonData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getAllData = async (req, res) => {
  try {
    const query = {};
    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.country) {
      query.country = req.query.country;
    }
    
    if (req.query.pinCode) {
      query.pinCode = req.query.pinCode;
    }

    const data = await Exceldata.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getByIdData = async (req, res) => {
    try {
        const Id = req.params.id;
        const user = await Exceldata.findById(Id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.json({ status: 200, message: "Data Get Successfully", data: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

const UpdateData = async (req, res) => {
  try {
      const Id = req.params.id;
      const user = await Exceldata.findByIdAndUpdate(Id);

      if (!user) {
          return res.status(404).json({ status: 404, message: "User not found" });
      }

      res.json({ status: 200, message: "Data Updated Successfully", data: user });
  } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteAllData = async (req, res) => {
  try {
    const deletedCount = await Exceldata.deleteMany({});
    res.json({ status: 200, message: `${deletedCount.length} documents deleted successfully` });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};



module.exports = {
    createExcel,
    getAllData,
    getByIdData,
    deleteAllData,
    UpdateData,
}