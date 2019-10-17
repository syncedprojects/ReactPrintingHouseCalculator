const path = require( 'path' );

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve( 'dist' ),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}