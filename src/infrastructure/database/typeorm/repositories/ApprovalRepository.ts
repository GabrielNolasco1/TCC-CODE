import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ApprovalSchema } from "../schemas/ApprovalSchema";
import { Approval, ApprovalStatus } from "@/domain/entities/Approval";
import { IApprovalRepository } from "@/domain/repositories/IApprovalRepository";

export class ApprovalRepository implements IApprovalRepository {
  private ormRepository: Repository<ApprovalSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(ApprovalSchema);
  }

  async findPendingByApproverId(approverId: string): Promise<Approval[]> {
    const schemas = await this.ormRepository.find({
      where: {
        approverId,
        status: ApprovalStatus.PENDING
      },
      order: { order: "ASC" }
    });

    return schemas.map(s => new Approval(s));
  }

  async save(approval: Approval): Promise<Approval> {
    const schema = this.ormRepository.create({
      id: approval.id,
      workflowId: approval.workflowId,
      approverId: approval.approverId,
      status: approval.status,
      order: approval.order,
      comments: approval.comments,
      createdAt: approval.createdAt,
      updatedAt: approval.updatedAt
    });
    const saved = await this.ormRepository.save(schema);
    return new Approval(saved);
  }

  async findById(id: string): Promise<Approval | null> {
    const s = await this.ormRepository.findOne({ where: { id } });
    if (!s) return null;
    return new Approval(s);
  }

  async findByWorkflowId(workflowId: string): Promise<Approval[]> {
    const schemas = await this.ormRepository.find({ where: { workflowId } });
    return schemas.map(s => new Approval(s));
  }

  async saveMany(approvals: Approval[]): Promise<Approval[]> {
    const schemas = approvals.map(a => this.ormRepository.create({
      id: a.id,
      workflowId: a.workflowId,
      approverId: a.approverId,
      status: a.status,
      order: a.order,
      comments: a.comments,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt
    }));

    const savedSchemas = await this.ormRepository.save(schemas);

    return savedSchemas.map(s => new Approval(s));
  }

  async findByWorkflowIdWithApprover(workflowId: string): Promise<any[]> {
  const approvals = await this.ormRepository.createQueryBuilder("approval")
    .leftJoinAndSelect("users", "user", "user.id = approval.approverId")
    .where("approval.workflowId = :workflowId", { workflowId })
    .select([
      "approval.id",
      "approval.status",
      "approval.order",
      "approval.comments",
      "approval.updatedAt",
      "user.name"
    ])
    .orderBy("approval.order", "ASC")
    .getRawMany();

  return approvals.map(app => ({
    id: app.approval_id,
    status: app.approval_status,
    order: app.approval_order,
    comments: app.approval_comments,
    updatedAt: app.approval_updated_at,
    approverName: app.user_name
  }));
}
}
