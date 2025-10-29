const sample_json = {
    "user": {
        "id": 101,
        "name": "Arun Shaw",
        "email": "arun@example.com",
        "isActive": true,
        "profile": {
            "age": 27,
            "location": {
                "city": "Bangalore",
                "country": "India"
            },
            "skills": ["JavaScript", "React", "Node.js"]
        }
    },
    "projects": [
        {
            "id": "p1",
            "name": "Video Call App",
            "status": "in_progress",
            "tech": ["Flutter", "Firebase", "Agora"]
        },
        {
            "id": "p2",
            "name": "Portfolio Website",
            "status": "completed",
            "tech": ["Next.js", "TailwindCSS"]
        }
    ],
    "settings": {
        "theme": "dark",
        "notifications": {
            "email": true,
            "sms": false,
            "push": true
        }
    }
}

export { sample_json }