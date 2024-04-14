
const Firm = require('../models/Firm')
const multer = require('multer')
const Vendor = require('../models/Vendor')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending timestamp to ensure unique filenames
    }
});

const upload = multer({ storage: storage });
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId)

        if (!vendor) {
            res.status(404).json({ error: 'Not Found' });
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })
        const savedFirm = await firm.save()
        vendor.firm.push(savedFirm)

        await vendor.save()
        res.status(200).json({ message: "Firm Added Successfully" })
        console.log(firmName)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
const deleteFirmById = async (req, res) => {
    try {
        const { firmId } = req.params.firmId
        const deletedFirm = await Firm.findByIdAndDelete(firmId)
        if (!deletedProduct) {
            return res.status(404).json({
                error: "Firm not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById }