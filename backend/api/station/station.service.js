const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('station')
        const stations = await collection.find().toArray()
        return stations
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }

}

async function remove(stationId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { userId, isAdmin } = store
        const collection = await dbService.getCollection('station')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(stationId) }
        // if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(stationId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}


async function add(station) {
    try {
        // peek only updatable fields!
        const stationToAdd = {
            name: station.name,
            desc: station.desc,
            imgUrl: station.imgUrl,
            likes: station.likes,
            genres: station.genres,
            songs: station.songs
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
        // peek only updatable fields!
        const stationToSave = {
            _id: ObjectId(station._id),
            name: station.name,
            desc: station.desc,
            imgUrl: station.imgUrl,
            likes: station.likes,
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

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


