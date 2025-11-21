import assert from 'node:assert/strict';
import { retentionAgent } from '../src/retention-agent';
import { AgentSignal } from '../src/types';

async function run() {
  const baselineSignal: AgentSignal = {
    employeeId: 'john.doe@company.com',
    performance: 0.85,
    burnoutRisk: 0.41,
    sentimentScore: -0.12,
    workload: 0.88,
    motivation: 0.5,
    fairnessScore: 0.72
  };

  const baselineResult = await retentionAgent(baselineSignal);
  assert.equal(baselineResult.risk, 0.515, 'baseline risk should match documented output');
  assert.equal(
    baselineResult.recommendation,
    'Workload Equity Alert: Rebalance tickets within 48h.',
    'workload branch should trigger'
  );
  assert.deepEqual(
    baselineResult.riskBreakdown,
    {
      burnout: 0.123,
      sentiment: 0.112,
      workload: 0.176,
      motivation: 0.075,
      fairness: 0.014,
      performance: 0.015
    },
    'risk breakdown should expose weighted contributions'
  );
  assert.ok(
    baselineResult.loopsEngaged.includes('Loop 4: Workload Equity'),
    'workload loop engagement should be present'
  );
  assert.ok(/^[a-f0-9]{12}$/.test(baselineResult.meta.anonymizedId), 'anonymized id should be hashed');
  assert.notEqual(baselineResult.meta.anonymizedId, baselineSignal.employeeId, 'raw identity must not leak');

  const fairnessSignal: AgentSignal = {
    employeeId: 'alice@example.com',
    performance: 0.92,
    burnoutRisk: 0.2,
    sentimentScore: 0.1,
    workload: 0.4,
    motivation: 0.76,
    fairnessScore: 0.55
  };

  const fairnessResult = await retentionAgent(fairnessSignal);
  assert.equal(
    fairnessResult.recommendation,
    'Equity Scan: fairness signal low — run allocation audit.',
    'fairness branch should surface equity audit recommendation'
  );
  assert.ok(
    fairnessResult.loopsEngaged.includes('Loop 7: Fairness & Inclusion'),
    'fairness loop should engage when equity signal drops'
  );
  assert.equal(fairnessResult.riskBreakdown.performance, 0.008, 'performance should attenuate risk when high');
  assert.equal(fairnessResult.meta.dignityProtocol, 'ACTIVE', 'dignity protocol flag should remain set');

  console.log('✅ retention-agent tests passed');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
