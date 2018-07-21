module.exports = (app, groupifyInstance) => {
    app.use('/health', require('./health'));
    app.use('/library', require('./library'));
    app.use('/playlist', require('./playlist'));
    app.use('/user', require('./user'));
}
