'use client';
import { sample_json } from "@/data/sample-json";
import { JsonTree } from "@/components/JsonTree";
import { ReactFlowProvider } from "@xyflow/react";
import { DisplayModeSwitcher } from "@/components/display-mode-switcher";
import { useCallback, useState, ClipboardEvent, useEffect } from "react";

interface FlowTree {
  initialNodes: any[];
  initialEdges: any[];
}

const home = () => {

  const [json, setJson] = useState(JSON.stringify(sample_json, null, 4));
  const [tree, setTree] = useState<FlowTree>({ initialNodes: [], initialEdges: [] });

  const onVisualize = useCallback((data: any) => {

    const nodeSpaceOffset = 300;

    const nodes: any = [];
    const edges: any = [];

    nodes.push(
      {
        id: '$',
        position: { x: nodeSpaceOffset, y: 0 },
        data: { label: 'Root' },
        style: { background: '#000', color: 'white', padding: 8, borderRadius: 8 }
      }
    )

    const xOffsets: any = {};

    const constructFlowNodeFromObject = (parent: any, data: any) => {

      const currentOffsetY = parent.position.y + (nodeSpaceOffset * 2);
      let currentOffsetX = Math.max((xOffsets[currentOffsetY] || 0), parent.position.x);

      if (Array.isArray(data)) {

        for (let i = 0; i < data.length; i++) {

          const key = i;

          const node: any = {
            id: `${parent.id}[${key}]`,
            position: { x: currentOffsetX, y: currentOffsetY },
            data: {},
            style: { background: '#22C55E', color: 'white', padding: 8, borderRadius: 8, overflow: 'hidden' }
          }

          const edge = {
            id: `${parent.id}:${node.id}`,
            source: parent.id,
            target: node.id
          }

          const value = data[key];

          if (typeof value == 'string') {
            node.data['label'] = `${key} : ${value}`;
          } else {
            node.data['label'] = key;
            constructFlowNodeFromObject(node, value);
          }

          nodes.push(node);
          edges.push(edge);

          currentOffsetX += nodeSpaceOffset;
        }

        xOffsets[currentOffsetY] = currentOffsetX;

      } else if (typeof data === 'object' && data != null) {

        for (const key of Object.keys(data)) {

          const node: any = {
            id: `${parent.id}.${key}`,
            position: { x: currentOffsetX, y: currentOffsetY },
            data: {},
            style: { background: '#3B82F6', color: 'white', padding: 8, borderRadius: 8, overflow: 'hidden' }
          }

          const edge = {
            id: `${parent.id}:${node.id}`,
            source: parent.id,
            target: node.id,
          }

          const value = data[key];

          if (typeof value == 'string') {
            node.data['label'] = `${key} : ${value}`;
          } else {
            node.data['label'] = key;
            constructFlowNodeFromObject(node, value);
          }

          nodes.push(node);
          edges.push(edge);

          currentOffsetX += nodeSpaceOffset;
        }

        xOffsets[currentOffsetY] = currentOffsetX;

      }
    }

    constructFlowNodeFromObject(nodes[0], data);

    setTree({
      initialNodes: nodes,
      initialEdges: edges,
    })
  }, [])

  const formatJson = useCallback((input: string): string => {

    try {
      const json = JSON.parse(input);
      const formatted = JSON.stringify(json, null, 4);
      return formatted;
    } catch (error) {
      return '';
    }

  }, []);

  const onPaste = useCallback((e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text');
    const formatted = formatJson(data);
    setJson(formatted);
  }, []);

  const onReset = useCallback(() => {
    setJson('');
    setTree({
      initialNodes: [],
      initialEdges: [],
    })
  }, [])

  useEffect(() => {
    onVisualize(JSON.parse(json))
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 pb-20 relative" >
        <textarea
          className="w-full h-full text-sm resize-none text-blue-900 dark:text-gray-300 focus:outline-none p-4 scrollbar-none"
          placeholder="Paste or Type JSON data"
          onPaste={onPaste}
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />
        <div className="bg-black/95 dark:bg-black/50 absolute left-0 right-0 bottom-0 p-4 flex justify-end items-center gap-4 rounded-t-xl border-t border-gray-900">
          <button
            className="bg-white h-11 px-4 rounded-full text-sm text-black"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="bg-white h-11 px-4 rounded-full text-sm text-black"
            onClick={() => onVisualize(JSON.parse(json))}
          >
            Visualize
          </button>
          <div className="flex items-center gap-2 border h-11 px-4 rounded-full bg-white text-black text-sm">
            <DisplayModeSwitcher />
            <p> Dark Mode </p>
          </div>
        </div>
      </div>
      <ReactFlowProvider>
        <JsonTree tree={tree} key={JSON.stringify(tree)} />
      </ReactFlowProvider>
    </div>
  )
}

export default home;
