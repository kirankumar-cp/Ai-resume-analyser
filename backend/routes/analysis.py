from fastapi import APIRouter
from backend.database import analyses_collection

router = APIRouter()


@router.get("/api/history")
async def get_history():

    analyses = list(
        analyses_collection.find(
            {},
            {"_id": 0}
        ).sort("_id", -1)
    )

    return {
        "success": True,
        "analyses": analyses
    }