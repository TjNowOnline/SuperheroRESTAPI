module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error('Fejl: ', err.message);
    res.status(statusCode).json({
        error: {
            message: err.message || 'Noget gik galt på serveren.'
        }
    });
}