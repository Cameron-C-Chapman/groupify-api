module.exports = (app, groupifyInstance) => {
    app.use('/api', require('./health'));
}
