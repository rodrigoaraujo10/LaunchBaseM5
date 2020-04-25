module.exports = {
    age(timestamp) {
        
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getMonth.getDate()) {
            age = age -1
        }
        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            format:`${day}/${month}/${year}`
            
        }
    }   
} 
