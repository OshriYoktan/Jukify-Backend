const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const stationService = require('./station.service')

async function getStations(req, res) {
    try {
        const stations = await stationService.query(req.query)
        res.send(stations)
    } catch (err) {
        logger.error('Cannot get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}


async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}




async function getStation(req, res) {
    try {
        const station = await stationService.getById(req.params.id)
        res.send(station)
    } catch (err) {
        logger.error('Cannot get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

async function deleteStation(req, res) {
    try {
        await stationService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete station', err)
        res.status(500).send({ err: 'Failed to delete station' })
    }
}


async function addStation(req, res) {
    try {
        var station = req.body
        console.log('station:', station)
        // station.byUserId = req.session.user._id
        station = await stationService.add(station)

        // prepare the updated station for sending out
        // station.byUser = await userService.getById(station.byUserId)
        // station.aboutUser = await userService.getById(station.aboutUserId)

        console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({ type: 'station-added', data: station })
        // socketService.emitToAll({ type: 'user-updated', data: station.byUser, room: req.session.user._id })
        res.send(station)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to add station' })
    }
}

async function updateStation(req, res) {
    try {
        const station = req.body
        console.log('station:', station)
        const savedStation = await stationService.update(station)
        res.send(savedStation)
        // socketService.broadcast({type: 'user-updated', data: station, to:savedUser._id})
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getStations,
    deleteStation,
    addStation,
    getStation,
    updateStation
}