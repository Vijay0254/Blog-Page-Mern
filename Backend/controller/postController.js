const PostModel = require('../model/postModel')

const postController = async(req,res) =>{
    const { title, description, email } = req.body
    const filename  = req?.file?.filename
    try{
        if(!title || !description){
            return res.status(200).json({message: "Enter Title and Description"})
        }
        else{
            const newPost = await PostModel({
                title: title,
                description: description,
                file: filename,
                email: email
            })
            await newPost.save()
            return res.status(200).json({message: "Posted Successfully"})
        }
    }
    catch(err){
        console.log(`Error in Post Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getPostController = async(req,res) =>{
    try{
        const post = await PostModel.find()
        return res.status(200).json(post)
    }
    catch(err){
        console.log(`Error in Get Post Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getPostByIdController = async(req,res) =>{
    try{
        const { id } = req.params
        const post = await PostModel.findById({_id: id})
        res.status(200).json(post)
    }
    catch(err){
        console.log(`Error in Get Post By Id Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const editPostController = async(req,res) =>{
    try{
        const { title, description } = req.body
        const { id } = req.params
        const updatedPost = await PostModel.findByIdAndUpdate(id, {
            title: title,
            description: description
        }, {new: true})
        if(!updatedPost){
            return res.status(200).json({message: "Post not found"})
        }
        return res.status(200).json({message: "Post Updated Successfully"})
    }
    catch(err){
        console.log(`Error in Edit Post Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const deletePostController = async(req,res) =>{
    try{
        const { id } = req.params
        await PostModel.findByIdAndDelete(id)
        return res.status(200).json({message: "Post Deleted Successfully"})
    }
    catch(err){
        console.log(`Error in Delete Post Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = { postController, getPostController, getPostByIdController, editPostController, deletePostController }