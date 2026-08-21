---
title: "Smart City Transit Analytics Engine"
category: "System Analysis"
featured: true
date: "2025-08"
summary: "System requirements analysis and architecture design for a municipal real-time bus and subway tracking platform."
thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"
role: "Lead Systems Analyst"
tools: ["Draw.io", "UML", "JSON Schema", "Docker"]
deliverables:
  [
    "System Requirements Specification (SRS)",
    "Data Flow Diagrams (DFD)",
    "API Spec",
  ]
liveUrl: "https://example.com/transit-live"
figmaUrl: null
---

## 1. Project Background & Challenge

The municipal transit authority of a major metropolitan city required a modern system to ingest, process, and publish real-time telemetry from a fleet of 1,200 buses and 15 subway lines. The existing system relied on polling-based telemetry that lagged by up to 3 minutes, causing frustration for commuters relying on mobile applications.

The challenge was to define a publish-subscribe architecture capable of processing 10,000 coordinates per second with sub-second latency, while keeping operational costs under a strict budget.

---

## 2. System Analysis & Architecture

We analyzed data formats, frequency of coordinate updates, and ingestion mechanisms to build a robust architecture.

### Architectural Diagram

Below is the data pipeline architecture proposed:

```mermaid
graph LR
    GPS[Fleet GPS Transmitters] -->|MQTT| Ingest[MQTT Broker / Eclipse Mosquitto]
    Ingest -->|Stream| Stream[Apache Kafka Topic]
    Stream -->|Process| Process[NodeJS Stream Consumer]
    Process -->|Cache| Redis[(Redis Geohash Store)]
    Process -->|Archive| DB[(PostgreSQL TimeScaleDB)]
    Redis -->|Push| API[WebSockets API Service]
    API -->|Live Map Update| Clients[Commuter Mobile Apps]
```

### Data Payload Definition

To minimize bandwidth overhead, we transitioned the data format from verbose JSON to protocol buffers (Protobuf), achieving a 78% payload size reduction.
