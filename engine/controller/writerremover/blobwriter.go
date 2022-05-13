package writerremover

import (
	"os"
	"path/filepath"
)

type BlobWriter interface {
	Write(blob *Blob) error
}

type BlobRemover interface {
	Remove() error
}

type BlobWriterRemover interface {
	BlobWriter
	BlobRemover
}

// Blob just used so this can be passed as a pointer and not copied around
type Blob struct {
	data     []byte
	filename string
}

type WorkdirWriter struct {
	workdir string
	perm    os.FileMode
	written []string
}

func NewBlob(data []byte, filename string) *Blob {
	return &Blob{data, filename}
}
func NewWorkdirWriter(workdir string, perm os.FileMode) *WorkdirWriter {
	return &WorkdirWriter{workdir: workdir, perm: perm, written: []string{}}
}

func (ww *WorkdirWriter) Write(blob *Blob) error {
	if blob == nil {
		// do nothing if given nothing
		return nil
	}
	filePath := filepath.Join(ww.workdir, blob.filename)
	if len(ww.written) == 0 {
		ww.written = make([]string, 0)
	}
	ww.written = append(ww.written, filePath)
	return os.WriteFile(filePath, blob.data, ww.perm)
}

func (ww *WorkdirWriter) Remove() error {
	var err error
	for _, filePath := range ww.written {
		err = os.RemoveAll(filePath)
		if err != nil {
			return err
		}
	}
	ww.written = []string{}
	return nil
}
