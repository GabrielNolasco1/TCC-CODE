import { AreaRepository } from "@/infrastructure/database/typeorm/repositories/AreaRepository";
import { AreaController } from "@/presentation/controllers/AreaController";
import { CreateAreaUseCase } from "@/application/use-cases/AreaCases/CreateAreaUseCase";
import { ListAreasUseCase } from "@/application/use-cases/AreaCases/ListAreasUseCase";
import { UpdateAreaUseCase } from "@/application/use-cases/AreaCases/UpdateAreaUseCase";
import { DeleteAreaUseCase } from "@/application/use-cases/AreaCases/DeleteAreaUseCase";

export const makeAreaController = (): AreaController => {
  const areaRepository = new AreaRepository();
  
  const createArea = new CreateAreaUseCase(areaRepository);
  const listAreas = new ListAreasUseCase(areaRepository);
  const updateArea = new UpdateAreaUseCase(areaRepository);
  const deleteArea = new DeleteAreaUseCase(areaRepository);

  return new AreaController(
    createArea, 
    listAreas, 
    updateArea, 
    deleteArea
  );
};