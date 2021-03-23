const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('station')
        const stations = await collection.find().toArray()
        var stationCopy = stations;
        if (!filterBy || (!filterBy.name && !filterBy.genre)) return stations
        var stationCopy = stations
        if (filterBy.name) {
            stationCopy = stations.filter(s => {
                return s.name.toLowerCase().includes(filterBy.name)
            })
        }
        if (filterBy.genre === 'all') return stationCopy;
        else {
            stationCopy = stationCopy.filter(s => {
                return s.genres.includes(filterBy.genre.toLowerCase())
            })
            return stationCopy;
        }
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }

}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const query = { _id: ObjectId(stationId) }
        await collection.deleteOne(query)
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}


async function add(station) {
    try {
        const stationToAdd = {
            name: station.name,
            imgUrl: station.imgUrl,
            desc: station.desc,
            likes: station.likes,
            genres: station.genres,
            songs: []
        }
        const collection = await dbService.getCollection('station')
        await collection.insertOne(stationToAdd)
        return stationToAdd;
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('station')
        const station = await collection.findOne({ '_id': ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding user ${stationId}`, err)
        throw err
    }
}

async function update(station) {
    try {
        const likes = parseInt(station.likes)
        const stationToSave = {
            _id: ObjectId(station._id),
            name: station.name,
            desc: station.desc,
            imgUrl: station.imgUrl,
            likes: likes,
            genres: station.genres,
            songs: station.songs
        }
        const collection = await dbService.getCollection('station')
        await collection.updateOne({ '_id': stationToSave._id }, { $set: stationToSave })
        return stationToSave;
    } catch (err) {
        logger.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}