const { DateTime } = require("luxon")

module.exports = {
    formatDate: function (date) {
        return DateTime.fromJSDate(date).toFormat('FF');
    },
    removeHTMLTags: function(str) {
        return str.replace(/<(?:.|\n)*?>/gm, "");
    },
    truncate: function (string, length) {
        if (string.length > length && string.length > 0) {
            let new_string = string + ''
            new_string = string.substr(0, length)
            new_string = string.substr(0, new_string.lastIndexOf(' '))
            new_string = new_string.length > 0 ? new_string : string.substr(0, length)
            return new_string + '...'
        }
        return string
    },
    editIcon: function(storyUser, loggedUser, storyId, floating=true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue">
                    <i class="fas fa-edit fa-small"></i></a>`
            } else {
              return `<a href="/stories/edit/${storyId}<i class="fas fa-edit></i></a>`
          }
        } else {
            return ' '
        }
        
    }
}