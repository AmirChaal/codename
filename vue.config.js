module.exports = {
    publicPath: '/jeu/',
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/scss/_variables.scss";
                `
            }
        }
    }
};