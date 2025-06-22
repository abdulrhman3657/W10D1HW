import History from "../models/history.model.js"

export const getHistory = async (req, res) => {
    try {

        const user = req.user

        console.log(user.email)

        let { skip, limit, sort, from, to, lat, lon, count } = req.query

        if(count){
            const historyList = await History.find({user: user._id})
            res.status(200).json({total: historyList.length})
            return
        }

        skip = skip ? skip : 0
        limit = limit ? limit : 10
        sort = sort ? sort : "-requestedAt"

        const historyList = await History
            .find({user: user._id} ) // {lon: lon}, {lat: lat}, {requestedAt: {$gte: from}}
            .populate({path: "weather", select: ["data.source", "data.tempC", "data.humidity", "data.description", "-_id"]})
            .select(["-_id", "-user", "-__v"])
            .limit(limit)
            .sort(sort)
            .skip(skip)

        res.status(200).json(historyList)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}