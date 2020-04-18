const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')


//index

exports.index = function(req, res){
    return res.render("members/index", { members: data.members })
}

//show


exports.create = function(req, res){
    return res.render('members/create')
}

// create - post
exports.post = function(req, res){
    
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, preencha todos os campos')
        } 
    }

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[ data.members.lenght - 1 ]

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        ...req.body,
        id,
        birth,
    
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send('Write file error...')
    
           
        return res.redirect(`/members/${id}`) 

    })
}

exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if (!foundMember) return res.send("Member not found")


    
    const member = {
        ...foundMember,
    birth: date(foundMember.birth).birthDay
    }

    return res.render('members/show', { member })
}

//edit
exports.edit = function(req, res) {
    
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }


    
    return res.render('members/edit', { member })

} 


// PUT

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if ( member.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found")

    
    const member = {
        ...foundMember,
        ...req.body,
        birth: date(req.body.birth),
        //id: Number(req.body.id),
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if( err ) return res.send("Write Error!")

        return res.redirect(`/members/${id}`)
    })

}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/members")
    })
}
