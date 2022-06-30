import React from 'react';

export default function Home(props: any) {
  return (
    <div className="App">
      {props.repos.length > 0 && (
        <div>
          {(props.repos as unknown as any[])
            .slice(0)
            .reverse()
            .map((x: any) => (
              <>
                <div key={x.id}>{x.name}</div>
                <p>{x.description}</p>
                <p>{x.language}</p>
                <p>{x.forks_count}</p>
              </>
            ))}
        </div>
      )}
    </div>
  );
}
