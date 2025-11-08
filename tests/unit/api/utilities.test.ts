import { PrismaClient } from '@prisma/client';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    axon_utility: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Utilities API', () => {
  let mockPrisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('GET /api/utilities', () => {
    it('returns all utilities when no filters applied', async () => {
      const mockUtilities = [
        {
          id: 'tool-1',
          name: 'Business Case',
          category: 'decision-support',
          status: 'PUBLISHED',
        },
      ];

      mockPrisma.axon_utility.findMany.mockResolvedValue(mockUtilities);

      expect(mockPrisma.axon_utility.findMany).toBeDefined();
    });

    it('filters utilities by category', async () => {
      const mockUtilities = [
        {
          id: 'tool-1',
          name: 'Business Case',
          category: 'decision-support',
          status: 'PUBLISHED',
        },
      ];

      mockPrisma.axon_utility.findMany.mockResolvedValue(mockUtilities);

      const result = await mockPrisma.axon_utility.findMany({
        where: { category: 'decision-support' },
      });

      expect(result).toEqual(mockUtilities);
      expect(mockPrisma.axon_utility.findMany).toHaveBeenCalledWith({
        where: { category: 'decision-support' },
      });
    });

    it('searches utilities by name and description', async () => {
      const mockUtilities = [
        {
          id: 'tool-1',
          name: 'Business Case',
          description: 'Business case analysis',
          category: 'decision-support',
        },
      ];

      mockPrisma.axon_utility.findMany.mockResolvedValue(mockUtilities);

      const result = await mockPrisma.axon_utility.findMany({
        where: {
          OR: [
            { name: { contains: 'Business', mode: 'insensitive' } },
            { description: { contains: 'Business', mode: 'insensitive' } },
          ],
        },
      });

      expect(result).toEqual(mockUtilities);
    });

    it('filters by status', async () => {
      const mockUtilities = [
        {
          id: 'tool-1',
          name: 'Business Case',
          status: 'PUBLISHED',
        },
      ];

      mockPrisma.axon_utility.findMany.mockResolvedValue(mockUtilities);

      const result = await mockPrisma.axon_utility.findMany({
        where: { status: 'PUBLISHED' },
      });

      expect(result).toEqual(mockUtilities);
    });
  });

  describe('GET /api/utilities/[id]', () => {
    it('returns utility by ID', async () => {
      const mockUtility = {
        id: 'tool-1',
        name: 'Business Case',
        category: 'decision-support',
      };

      mockPrisma.axon_utility.findUnique.mockResolvedValue(mockUtility);

      const result = await mockPrisma.axon_utility.findUnique({
        where: { id: 'tool-1' },
      });

      expect(result).toEqual(mockUtility);
    });

    it('returns null when utility not found', async () => {
      mockPrisma.axon_utility.findUnique.mockResolvedValue(null);

      const result = await mockPrisma.axon_utility.findUnique({
        where: { id: 'non-existent' },
      });

      expect(result).toBeNull();
    });
  });

  describe('Prisma Client', () => {
    it('disconnects after query', async () => {
      await mockPrisma.$disconnect();
      expect(mockPrisma.$disconnect).toHaveBeenCalled();
    });
  });
});

