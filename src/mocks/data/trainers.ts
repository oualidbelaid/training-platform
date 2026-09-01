import type { TrainerDTO } from '@/types/dto/trainer.dto'

/**
 * Empty at the client's explicit request: ISTAM does not publicly expose
 * individual trainer identities, profiles, photos or biographies (see
 * docs/ROADMAP.md). The `Trainer` DTO/entity/repository/service/mapper
 * pipeline is intentionally kept intact — it's generic, reusable
 * infrastructure (matching every other domain's Mock → DTO → Mapper →
 * Repository → Service → Hook chain, see docs/ARCHITECTURE.md) that a
 * future private/admin surface could still use without rebuilding it, even
 * though no public page renders `Trainer` data anymore. An empty result
 * set is a normal, valid state for this pipeline to return — no component,
 * hook, or service change was needed to support it.
 */
export const mockTrainerDTOs: TrainerDTO[] = []
